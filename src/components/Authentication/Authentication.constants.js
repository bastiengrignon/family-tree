export const AuthenticationConstants = {
  login: {
    title: 'Se connecter',
    forgotPasswordLink: 'Vous avez oublié votre mot de passe ?',
    noAccountLink: 'Pas de compte ? Inscrivez-vous',
  },
  register: {
    title: 'S’inscrire',
    firstNameLabel: 'Prénom',
    lastNameLabel: 'Nom',
    confirmPasswordLabel: 'Confirmer le mot de passe',
  },
  forgotPassword: {
    title: 'Mot de passe oublié ?',
    resetPasswordButton: 'Réinitialiser le mot de passe',
    mailSend: 'Un mail vous a été envoyé',
  },
  alreadyAnAccountLink: 'Déjà un compte ? Connectez-vous',
  emailAddressLabel: 'Adresse e-mail',
  passwordLabel: 'Mot de passe',
  formValidation: {
    email: 'Entrez une adresse e-mail valide',
    password:
      'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, 1 chiffre et un caractère spécial',
    confirmPassword: 'Les mot de passe ne correspondent pas',
    atLeast2Characters: 'Au moins 2 caractères',
  },
  separatorLabel: 'ou continuer par email',
};

export const AuthenticationLayout = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

export const FORM_TYPES = {
  login: 'login',
  register: 'register',
  forgotPassword: 'forgotPassword',
};
