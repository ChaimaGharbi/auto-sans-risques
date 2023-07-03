import React from "react";

const constants = {
  menus: [
    {
      allowed: "dash",
      link: "/dashboard",
      linkSvg: "/media/svg/icons/Design/Layers.svg",
      title: "Tableau de bord",
    },
    {
      allowed: "clients",
      link: "/dash/clients",
      linkSvg: "/media/svg/icons/Communication/Group.svg",
      title: "Clients",
    },
    {
      allowed: "experts",
      link: "/dash/experts",
      linkSvg: "/media/svg/icons/Communication/Add-user.svg",
      title: "Experts",
    },
    {
      allowed: "moderators",
      link: "/dash/moderators",
      linkSvg: "/media/svg/icons/Communication/Add-user.svg",
      title: "Moderators",
    },
    {
      allowed: "rapports",
      link: "/dash/rapports",
      linkSvg: "/media/svg/icons/Shopping/Wallet.svg",
      title: "Rapports",
    },
    {
      allowed: "reclama",
      link: "/dash/reclamations",
      linkSvg: "/media/svg/icons/Communication/Mail.svg",
      title: "Reclamations",
    },
    {
      allowed: "assist",
      link: "/dash/assistances",
      linkSvg: "/media/svg/icons/Communication/Incoming-call.svg",
      title: "Assistances",
    },
    {
      allowed: "missions",
      link: "/dash/reservations",
      linkSvg: "/media/svg/icons/Communication/Archive.svg",
      title: "Missions",
    },
    {
      allowed: "avis",
      link: "/dash/avis",
      linkSvg: "/media/svg/icons/Communication/Chat2.svg",
      title: "Avis",
    },
  ],
  configs: [
    {
      allowed: "ads",
      link: "/dash/marques",
      linkSvg: "/media/svg/icons/Shopping/Settings.svg",
      title: "Marques",
    },
    {
      allowed: "articles",
      link: "/dash/articles",
      linkSvg: "/media/svg/icons/Shopping/Settings.svg",
      title: "Articles",
    },
    {
      allowed: "marks",
      link: "/dash/packs",
      linkSvg: "/media/svg/icons/Shopping/Settings.svg",
      title: "Packs",
    },
    {
      allowed: "packs",
      link: "/dash/ads",
      linkSvg: "/media/svg/icons/Shopping/Settings.svg",
      title: "Les bannières publicitaires",
    },
    {
      allowed: "rapport",
      link: "/dash/questions/rapportcategories",
      linkSvg: "/media/svg/icons/Shopping/Settings.svg",
      title: "Rapport questions",
    },
  ],
};

export default constants;
