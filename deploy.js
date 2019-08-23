const fs = require('fs');
const join = require('path').join;

const keys = require('./qiniu.json')
const qiniu = require('qiniu')

const bucket = 'herald-hybrid'
const mac = new qiniu.auth.digest.Mac(keys.ak, keys.sk);
const putPolicy = new qiniu.rs.PutPolicy({bucket});
const uploadToken = putPolicy.uploadToken(mac);

const qiniuConfig = new qiniu.conf.Config();
qiniuConfig.zone = qiniu.zone.Zone_z0;
qiniuConfig.useHttpsDomain = true;

const bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig);

let filesToDelete = []

// 获取当前的文件列表
bucketManager.listPrefix(bucket, {}, function(err, respBody, respInfo) {
    if (err) {
      console.log(err);
      throw err;
    }
    if (respInfo.statusCode == 200) {
      let items = respBody.items;
      items.forEach(function(item) {
        if (typeof(item) === 'string' && !item.endsWith('apk')) {
            filesToDelete.push(item)
        }
      });
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });

// 删除空间中旧的文件
filesToDelete.forEach( (key) => {
    bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
        if (err) {
          console.log(err);
          //throw err;
        } else {
          console.log(`\r ${key} 删除成功 ✨`);
        }
      });
})

function findSync(startPath) {
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result;
}

const filesToUpload = findSync('./dist')

filesToUpload.forEach( (localFile) => {
    let formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
    let name = localFile.split('/')[1]
    let putExtra = new qiniu.form_up.PutExtra();
    formUploader.putFile(uploadToken, name, localFile, putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode == 200) {
          console.log(`\r ${localFile} 上传成功 👌`)
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      });
})

  