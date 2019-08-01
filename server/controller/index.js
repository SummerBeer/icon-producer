const Icon = require('../model/iconModel.js');
const Repo = require('../model/repoModel.js');

/**
 * @description: 存储图标
 * @param {Object} icon 
 * @return: icon
 */
const iconSave = (icon) => {
  const _icon = new Icon({
    ...icon
  });
  _icon.save();
};

/**
 * @description: 存储仓库
 * @param {Object} repo 
 * @return: 
 */
const repoSave = (repo) => {
  const { repoName } = repo;
  const _repo = new Repo({
    repoName
  });
  _repo.save();
};

/**
 * @description:  获取仓库中所有图标
 * @param {String} repoId 
 * @return: icons
 */
const getIconList = (repoId) => {
  return Icon.find({});
};

const getRepoList = () => {
  return Repo.find({});
}

const getIconByRepo = (repo) => {
  const repoName = repo.repoName;
  Icon.find({ repoName: repoName }, (err, res) => {
    return res;
  });
}

module.exports = {
  iconSave,
  repoSave,
  getIconList,
  getRepoList,
  getIconByRepo,
};