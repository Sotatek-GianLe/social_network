export const enum GLOBAL_STATUS {
  INACTIVE,
  ACTIVE,
};
export const enum USER_TYPE {
  USER,
  ADMIN,
};
export const enum COMPANY_CODE {
  SOTATEK,
  DOKPIK_AI,
};

export const enum GENERATE_TYPE {
  GENERATE,
  EDIT,
  INTERIOR_GENERATE,
  INTERIOR_EDIT
};

export const enum PAYMENT_STATUS {
  FAIL,
  SUCCESS,
  PROCESSING,
};

export const enum PAYMENT_METHOD {
  CREDIT,
  VNPAY,
  BANK,
};

export const enum NOTIFICATION_TYPE {
  GENERATEANDEDIT,
  PAYMENT_HISTORY,
  PROMOTION,
};

export const LEVEL_PACKAGE = {
  FREE: 0,
  CUSTOM: 98,
  ADMIN: 99,
};

export const enum TYPE_PACKAGE {
  SALE,
  CUSTOM_SALE,
};

export const MESS_GENE_EDIT = {
  GENERATE: "Your generated images are ready, you will need to click on love icon to add an image to your collection.",
  EDIT: "Your edited image is ready.",
};

export const SUCCESS_RESPONSE_MESSAGE: string = "ok";
export const EXPIRE_TIME_TOKEN: number = 60 * 60 * 24 * 30;
