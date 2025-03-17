type ModelErrorType = "TagNotFoundError" | "EquipmentNameIsAlreadyUsed";

const ERROR_MESSAGES: Record<ModelErrorType, string> = {
	TagNotFoundError: "Tag not found",
	EquipmentNameIsAlreadyUsed: "Equipment name is already used",
};

export class ModelError extends Error {
	constructor(type: ModelErrorType) {
		super(ERROR_MESSAGES[type]);
	}
}
