const createErrorFactory = function (name: string, statusCode: number) {
    return class BusinessError extends Error {
        statusCode: number;

        constructor(message: string) {
            super(message);
            this.name = name;
            this.statusCode = statusCode;
         
        }
    };
};

export const ErrorAccessingDatabase = createErrorFactory(
    "Error accessing the database",
    500
);
export const ErrorNotFound = createErrorFactory("Resource not found", 404);
export const ErrorUnauthorized = createErrorFactory("Unauthorized access", 401);
export const ErrorGenerateToken = createErrorFactory(
    "Failed to generate the token",
    500
);
export const ErrorValidateToken = createErrorFactory("Invalid token", 500);
export const ErrorMissingRequiredFields = createErrorFactory(
    "Required fields not provided",
    400
);
export const ErrorPayloadDecoding = createErrorFactory(
    "Failed to retrieve or decode the payload",
    400
);

export const ErrorPasswordHashing = createErrorFactory(
    "Failed to hash the password",
    500
);

export const ErrorPasswordComparison = createErrorFactory(
    "Failed to compare passwords",
    400
);

export const ErrorCredentials = createErrorFactory("Credentials Invalid", 400);


