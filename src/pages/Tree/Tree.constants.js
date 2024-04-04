export const BACK_BUTTON_LABEL = 'Retour';

export const TreeConstants = {
  menu: {
    members: 'Membres',
    share: 'Partager',
    dangerZone: 'Danger',
    makePrivate: 'Rendre privé',
    makePublic: 'Rendre public',
    quitTree: 'Quitter l’arbre',
    deleteTree: 'Supprimer',
  },
  modalMembers: {
    title: 'Membres de l’arbres',
  },
  modalUnauthorized: {
    title: 'Vous n’êtes pas autorisé à voir cet arbre généalogique',
    buttonBackHome: 'Retour à l’accueil',
  },
  modalMakePrivate: {
    title: 'Changer la visibilité',
    description: 'Vous pouvez rendre cet arbre privé en demandant un code dès qu’une personne veut rejoindre',
    inputCodeLabel: 'Code d’entrée',
    buttonMakePrivate: 'Rendre privé',
    buttonMakePublic: 'Rendre public',
    notification: {
      title: (isPrivate) => `Cet arbre est maintenant ${isPrivate ? 'privé' : 'public'}`,
    },
  },
  error: {
    onlyAdminAllowed: 'Only admin can update the name',
  },
};
