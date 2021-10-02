const BASE_API_URL = 'http://localhost:4444';

async function mapViews(widget, factoryFn, callback) {
  const { View, slots = {} } = await factoryFn(widget);
  const { containerSelector } = widget;

  // Add container selectors defined on widget instance after creation
  Object.keys(widget.slots).forEach((slotName) => {
    slots[slotName].isSlot = true;
    slots[slotName].containerSelector =
      widget.slots[slotName].containerSelector;
  });

  return [
    { View, containerSelector, isSlot: false },
    ...Object.values(slots),
  ].map(({ View, containerSelector, isSlot }) => {
    callback({
      View,
      isSlot,
      containerSelector,
      container:
        containerSelector && document?.querySelector(containerSelector),
    });
  });
}

async function fetchApi(
  widget,
  resource,
  body,
  options = {
    method: 'GET',
  }
) {
  const { response } = await widget.http.request({
    url: `${BASE_API_URL}${resource}`,
    method: options?.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });

  return response;
}

function loginApi() {
  return {
    openModal(widget) {
      widget.setState({ isModalVisible: true });
    },
    closeModal(widget) {
      widget.setState({ isModalVisible: false });
    },
    async login(widget, body) {
      return widget
        .fetchApi('/auth/login', body, {
          method: 'POST',
        })
        .then((response) =>
          widget.setState({
            user: response?.body?.data?.user,
          })
        );
    },
    async logout(widget) {
      return widget.fetchApi('/auth/logout').then(() =>
        widget.setState({
          user: null,
        })
      );
    },
    async check(widget) {
      return widget.fetchApi('/auth/check').then((response) =>
        widget.setState({
          user: response?.body?.data?.user,
        })
      );
    },
  };
}

export { mapViews, fetchApi, loginApi };
