
export const trimModelAttributes = (model: any) => {
	Object.keys(model.dataValues).forEach((key: any) => {
		if (typeof model.dataValues[key] === 'string') {
			model.dataValues[key] = model.dataValues[key].trim()
		}
	})

	return JSON.parse(JSON.stringify(model))
}




