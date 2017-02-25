
export function deepFreeze(object) {
	if (!(object instanceof Object)) {
		return object;
	}

	Object.freeze(object);
	if (object instanceof Array) {
		for (let element of object) {
			deepFreeze(element);
		}
	} else {
		for (let propertyName of Object.keys(object)) {
			deepFreeze(object[propertyName]);
		}
	}

	return object;
}

export function clone(object) {
	if (!(object instanceof Object)) {
		return object;
	}

	if (object instanceof Array) {
		return object.map(element => clone(element))
	}

	let clonedData = {};
	for (let propertyName of Object.keys(object)) {
		clonedData[propertyName] = clone(object[propertyName]);
	}

	return clonedData;
}
