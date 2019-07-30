// function fileUpload() {
//   const data = new FormData();
//   const files = $('#file')[0].files;
//   for (let i = 0; i < files.length; i++) {
//     data.append('file', files[i])
//   }
//   $.ajax({
//     data: data,
//     url: '/repo',
//     type: 'POST',
//     contentType: 'multipart/form-data',
//     success: (res) => {
//       console.log('/repo', res);
//     }
//   });
// }

// $('#submit').on('click', () => {
//   console.log('submit');
//   this.fileUpload();
// });