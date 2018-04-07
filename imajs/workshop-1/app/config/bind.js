import Dictionary from 'ima/dictionary/Dictionary';
import Dispatcher from 'ima/event/Dispatcher';
import EventBus from 'ima/event/EventBus';
import Router from 'ima/router/Router';
import Window from 'ima/window/Window';

export default (ns, oc, config) => {

	// WORKSHOP: SHOW
	oc.constant('REST_API_BASE_URL', 'http://localhost:3001/static/api');

	//COMPONENT Utils
	oc.constant('$Utils', {
		$Router: oc.get(Router),
		$Dispatcher: oc.get(Dispatcher),
		$EventBus: oc.get(EventBus),
		$Dictionary: oc.get(Dictionary),
		$Settings: oc.get('$Settings'),
		$Window: oc.get(Window),
		$CssClasses: oc.get('$CssClasses')
	});
};
