export const formErrorMessages = {
    required: (label: string) => `${label} is required`,
    minlength: (label: string, min: number) => `${label} must be at least ${min} characters`,
};

export const authErrorMessages = {
    authFailed: () => `Incorrect username or password`,
};
