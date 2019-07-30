const express = require('express');
const controller = require('../controller/index.js');
const logger = require('../utils/logger.js');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'upload/'});

const navItems = [
  {
    label: '图标库',
    url: '/',
    active: '',
  },
  {
    label: '创建图标库',
    url: '/repo',
    active: '',
  }
];


router.get('/', async (req, res) => {
  navItems.forEach(v => v.active = '');
  const navItem = navItems.find(v => v.url === '/').active = 'active';
  const repos = await controller.getRepoList() || [{}];

  repos.forEach(async(v, i) => {
    v.iconNum = (await controller.getIconByRepo(v) || []).length;
  })

  logger.info(repos);
  res.render('index', {
    navItems,
    repos,
  });
});


router.get('/repo', async (req, res) => {
  navItems.forEach(v => v.active = '');
  const navItem = navItems.find(v => v.url === '/repo').active = 'active';
  res.render('repo', {
    navItems,
  });
});


router.post('/repo', async (req, res) => {
  const repos = await controller.getRepoList() || [];
  const repoName = req.body.repoName;

  if (repos.findIndex(v => v.repoName === repoName) > -1) {
    res.send({
      code: 500,
      msg: '仓库已存在',
    });
    return;
  }

  controller.repoSave(req.body);

  res.send({
    code: 0,
    msg: '创建成功',
  });
});

module.exports = router;