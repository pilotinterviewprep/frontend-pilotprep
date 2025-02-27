// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // ROOTS
  root: '/',
  privacy_policy: '/privacy-policy',
  contact_us: '/contact-us',

  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    sign_in: '/sign-in',
    sign_up: '/sign-up',
    forgot_password: `/forgot-password`,
    change_password: '/change-password',
    update_profile: '/update-profile',
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,

    // account 
    reset_password: `${ROOTS.DASHBOARD}/reset-password`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
};
