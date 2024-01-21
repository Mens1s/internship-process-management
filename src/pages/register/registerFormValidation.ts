export const validateRegisterForm = (form: any) => {
  if (form.mail) {
    const rule1 = form.mail.includes("@");

    if (!rule1) {
      return {
        status: false,
        message: "Lütfen geçerli bir mail adresi giriniz.",
      };
    }
  }

  if (form.firstName) {
  }
  if (form.lastName) {
  }

  return { status: true };
};
