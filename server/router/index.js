const express = require('express');
const controller = require('../controller/index.js');
const logger = require('../utils/logger.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const fsUtil = require('../utils/fsUtil.js');
const router = express.Router();

const upload = multer({ storage: multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, `../../upload/svg/`);
    await fsUtil.mkdir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})});

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
  },
  {
    label: '图标',
    url: '/icons',
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

  if (!repoName) {
    res.send({
      code: 500,
      msg: '请输入仓库名',
    });
    return;
  }

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

router.get('/icon', async (req, res) => {
  const repo = req.query;
  const icons = await controller.getIconByRepo(repo);
  res.render('repoIcons', {
    navItems,
    icons
  });
});

router.post('/icon', upload.array('file', 30), async (req, res) => {
  const files = req.files;
  const check = files.findIndex(v => !/(.svg)$/.test(v.originalname));
  if (!files) {
    res.render('result', { msg: '上传失败'});
  }
  if (check > -1) {
    fsUtil.clear();
    res.render('result', { msg: '不可上传非svg文件' });
    return;
  }
  files.forEach(async (v, i) => {
    const icon = {
      className: v.originalname.split('.')[0],
      label: v.originalname.split('.')[0],
      url: v.path,
      filename: v.filename,
      repoName: '',
    }
    await controller.iconSave(icon);
  })
  res.render('result', { msg: '上传成功' });
})

router.get('/icons', async (req, res) => {
  navItems.forEach(v => v.active = '');
  const navItem = navItems.find(v => v.url === '/icons').active = 'active';
  const icons = await controller.getIconList();
  res.render('icons', {
    navItems,
    icons,
  });
});

module.exports = router;