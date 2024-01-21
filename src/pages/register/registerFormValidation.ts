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

  if (form.password) {
    const rule1 = form.password.length > 7;
    const rule2 = /[A-Z]/.test(form.password); // Check for at least one uppercase letter
    const rule3 = /\d/.test(form.password); // Check for at least one digit

    if (!rule1) {
      return {
        status: false,
        message: "Şifreniz en az 8 karakter uzunluğunda olmalıdır",
      };
    }
    if (!rule2) {
      return {
        status: false,
        message: "Şifreniz en az bir büyük harf içermelidir",
      };
    }
    if (!rule3) {
      return {
        status: false,
        message: "Şifreniz en az bir rakam içermelidir",
      };
    }
  }

  return { status: true };
};
