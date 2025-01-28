const features = {
  auth: '/auth',
  user: '/user',
  image: '/image',
};

const api_endpoint = {
  auth: {
    send_otp: `${features.auth}/send-otp`,
    register: `${features.auth}/register`,
    login: `${features.auth}/login`,
    forgot_password: `${features.auth}/forgot-password`,
    change_password: `${features.auth}/reset-password`,
  },
  user: {
    update_profile: `${features.user}/update-profile`,
  },
  image: {
    upload_images: `${features.image}/upload-images`,
    get_images: `${features.image}`,
    update_image: `${features.image}/update`,
    delete_image: `${features.image}/delete-images`,
  },
};

export default api_endpoint;
