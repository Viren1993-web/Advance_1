using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService, IHttpContextAccessor httpContextAccessor)
        {
            _environment = environment;
            _tempFolder = "Images";
            _awsService = awsService;
            _httpContextAccessor = httpContextAccessor;
        }

        //Photoupload by Kushan
        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            try
            {
                var UniqueFileName = "";
                string pathWeb = "";
                string path = "";
                string uploadfolder = "";
                pathWeb = _environment.ContentRootPath;

                //if (string.IsNullOrWhiteSpace(_environment.WebRootPath))
                //{
                    
                //    _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                //}

                uploadfolder = Path.Combine(pathWeb, _tempFolder);
                if (!Directory.Exists(uploadfolder))
                {
                    Directory.CreateDirectory(uploadfolder);
                }

                if (file != null && type == FileType.ProfilePhoto && !string.IsNullOrWhiteSpace(uploadfolder))
                {
                    UniqueFileName = $@"{DateTime.Now.Ticks}_" + file.FileName;
                    path = Path.Combine(uploadfolder, UniqueFileName);
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);

                       // await _awsService.PutFileToS3(path, fileStream, "[Bucket name]");
                    }
                }
                return UniqueFileName;
            }
            catch(Exception e)
            {
                return "";
            }
            
        }

        //Photoupload by Kushan
        public async Task<string> GetFileURL(string filename, FileType type)
        {
            string path = "";
            try
            {
                
                //get the url of web site
                string myHostUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}";

                if (!string.IsNullOrWhiteSpace(filename))
                { path = Path.Combine(myHostUrl, _tempFolder, filename); }

                return path;
            }

            catch 
            {
                return path;
            }
        }


        //Photoupload by Kushan
        public async Task<bool> DeleteFile(string filename, FileType type)
        {
            var isdeleted = false;
            try
            {
                string pathWeb = "";
                string uploadfolder = "";
                pathWeb = _environment.ContentRootPath;

                uploadfolder = Path.Combine(pathWeb, _tempFolder);

                if (Directory.Exists(uploadfolder))
                {
                    if (File.Exists(Path.Combine(uploadfolder, filename)))
                    {
                        // If file found, delete it    
                        File.Delete(Path.Combine(uploadfolder, filename));
                        isdeleted = true;
                    }
                }

                return isdeleted;
            }
            catch(Exception e)
            {
                return isdeleted;
            }
        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
