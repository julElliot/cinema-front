class AdminActionHelper {
  isRemovable = url => url.indexOf('https') === -1;
}

const adminActionHelper = new AdminActionHelper();

export default adminActionHelper;
