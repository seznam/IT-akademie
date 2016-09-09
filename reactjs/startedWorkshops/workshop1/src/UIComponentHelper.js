/**
 * UI component helper.
 *
 * @class UIComponentHelper
 */
export default class UIComponentHelper {

	/**
	 * Returns percent of visibility defined area in window viewport.
	 *
	 * @method getPercentOfVisibility
	 * @param {{top: number, left: number, width: number, height: number}} elmRect
	 * @return {number} The percent of visibility.
	 */
	getPercentOfVisibility(elmRect) {
		
	}

	/**
	 * Returns window viewport rect.
	 *
	 * @method getWindowViewportRect
	 * @return {{top: number, left: number, width: number, height: number}}
	 */
	getWindowViewportRect() {
		let top = 0;
		let left = 0;
		let width = window.innerWidth;
		let height = window.innerHeight;

		return { top, left, width, height };
	}

	/**
	 * Returns the size of an element and its position relative to the viewport and
	 * add extended value to returned rect.
	 *
	 * @method getBoundingClientRect
	 * @param {Element} element
	 * @param {{width: number, height: number}} size
	 * @param {number} extended
	 * @return {{top: number, left: number, width: number, height: number}}
	 */
	getBoundingClientRect(element, { width, height } = { width: 0, height: 0 }, extended = 0) {
		if (!element || typeof element.getBoundingClientRect !== 'function') {
			throw new Error(`Element rect is required with callable getBoundingClientRect()` +
					` method on element.`);
		}

		let clientRect = element.getBoundingClientRect();
		let elmRectStyle = {
			top: clientRect.top - extended,
			left: clientRect.left - extended,
			width: clientRect.width + extended,
			height: (clientRect.height || height || 0 / width || 0 * clientRect.width) + extended
		};

		return elmRectStyle;
	}

	/**
	 * @method throttle
	 * @param {function(*)} func
	 * @param {number} interval
	 * @param {?object} scope
	 * @return {function(*)}
	 */
	throttle(func, interval, scope) {
		if (arguments.length < 2) {
			interval = 100;
		}
		if (arguments.length < 3) {
			scope = null;
		}
		let timeout = null;
		let args = [];
		let shouldFireMethod = false;

		if (scope) {
			func= func.bind(scope);
		}

		function callCallback() {
			timeout = setTimeout(function () {
				timeout = null;
				if (shouldFireMethod) {
					shouldFireMethod = false;
					callCallback();
				}
			}, interval);
			func(...args);
		}

		return function () {
			let rest = [].slice.call(arguments);
			args = rest;

			if (!timeout) {
				callCallback();
			} else {
				shouldFireMethod = true;
			}
		};
	}

	/**
	 * Registers the provided event listener to be executed when the specified
	 * event occurs on the specified event target.
	 *
	 * Registering the same event listener for the same event on the same event
	 * target with the same {@code useCapture} flag value repeatedly has no
	 * effect.
	 *
	 * @method bindEventListener
	 * @param {EventTarget} eventTarget The event target.
	 * @param {string} event The name of the event.
	 * @param {function(Event)} listener The event listener.
	 * @param {boolean=} [useCapture=false] If true, the method initiates event
	 *        capture. After initiating capture, all events of the specified
	 *        type will be dispatched to the registered listener before being
	 *        dispatched to any EventTarget beneath it in the DOM tree. Events
	 *        which are bubbling upward through the tree will not trigger a
	 *        listener designated to use capture.
	 */
	bindEventListener(eventTarget, event, listener, useCapture = false) {
		if (eventTarget.addEventListener) {
			eventTarget.addEventListener(event, listener, useCapture);
		}
	}

	/**
	 * Deregisters the provided event listener, so it will no longer we
	 * executed when the specified event occurs on the specified event target.
	 *
	 * The method has no effect if the provided event listener is not
	 * registered to be executed at the specified event.
	 *
	 * @method unbindEventListener
	 * @param {EventTarget} eventTarget The event target.
	 * @param {string} event The name of the event.
	 * @param {function(Event)} listener The event listener.
	 * @param {boolean=} [useCapture=false] The {@code useCapture} flag value
	 *        that was used when the listener was registered.
	 */
	unbindEventListener(eventTarget, event, listener, useCapture = false) {
		if (eventTarget.removeEventListener) {
			eventTarget.removeEventListener(event, listener, useCapture);
		}
	}

	/**
	 * Generate a string of CSS classes from the properties of the passed-in
	 * object that resolve to true.
	 *
	 * @method cssClasses
	 * @param {...?(string|Object<string, boolean>)} classRuleGroups CSS
	 *        classes in a string separated by whitespace, or a map of CSS
	 *        class names to boolean values. The CSS class name will be
	 *        included in the result only if the value is {@code true}.
	 *        Declarations in the later class rule group will override the
	 *        declarations in the previous group.
	 * @return {string} String of CSS classes that had their property resolved
	 *         to {@code true}.
	 */
	cssClasses(...classRuleGroups) {
		classRuleGroups = classRuleGroups
			.filter(group => !!group)
			.map((classRules) => {
				if (typeof classRules === 'string') {
					var  separatedClassNames = classRules.split(/\s+/);
					classRules = {};

					for (var className of separatedClassNames) {
						classRules[className] = true;
					}
				}
				if (!(classRules instanceof Object)) {
					throw new Error('The class rules must be specified as a ' +
							`plain object or a string, ${classRules} provided`);
				}

				return classRules;
			});

		return classRuleGroups.map(
			group => Object.keys(group).filter(className => group[className])
		).map(
			classNames => classNames.join(' ')
		).join(' ');
	}
}

export let uiComponentHelper = new UIComponentHelper();
