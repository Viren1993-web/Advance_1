using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<UserSkill> _userSkillRepository;
        IRepository<UserExperience> _userExperienceRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<UserSkill> userSkillRepository,
                              IRepository<UserExperience> userExperienceRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userSkillRepository = userSkillRepository;
            _userExperienceRepository = userExperienceRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }


        #region Language component Methods

        public async Task<bool> AddNewLanguage(AddLanguageViewModel language)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                if(language.CurrentUserId!=null)
                {
                    var userLanguage = new UserLanguage();
                    userLanguage.Language = language.Name;
                    userLanguage.LanguageLevel = language.Level;
                    userLanguage.UserId = language.CurrentUserId;
                    userLanguage.IsDeleted = false;
                    await _userLanguageRepository.Add(userLanguage);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteLanguage(string id)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                var lanuage = await _userLanguageRepository.GetByIdAsync(id);
                if (lanuage != null)
                {
                    lanuage.IsDeleted = true;
                    await _userLanguageRepository.Update(lanuage);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateLanguage(AddLanguageViewModel language)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                var userlanuage = await _userLanguageRepository.GetByIdAsync(language.Id);
                if (userlanuage != null)
                {
                    userlanuage.Id = userlanuage.Id;
                    userlanuage.UserId = userlanuage.UserId;
                    userlanuage.Language = language.Name;
                    userlanuage.LanguageLevel = language.Level;
                    await _userLanguageRepository.Update(userlanuage);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<AddLanguageViewModel>> GetLanguages(string id)
        {
           // throw new NotImplementedException();
            var _userlanguages = await _userLanguageRepository.FindAsync(x => x.UserId == id);
              var userlanguages = _userlanguages.Where(x => !x.IsDeleted).Select(x => new List<UserLanguage>() {x} ).SelectMany(x => x).Distinct();

            //var userlanguages = from language in _userlanguages
            //                    where !language.IsDeleted
            //                    select language;

            List<AddLanguageViewModel> languages = new List<AddLanguageViewModel>();

            foreach (var item in userlanguages)
            {
                languages.Add(ViewModelFromLaguage(item));
            }


            return languages;
            
        }

        #endregion

        #region Skill Component Methods

        public async Task<bool> AddNewSkill(AddSkillViewModel skill)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                if (skill.CurrentUserId != null)
                {
                    var userskill = new UserSkill();
                    userskill.Skill = skill.Name;
                    userskill.ExperienceLevel = skill.Level;
                    userskill.UserId = skill.CurrentUserId;
                    userskill.IsDeleted = false;
                    await _userSkillRepository.Add(userskill);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteSkill(string id)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                var skill = await _userSkillRepository.GetByIdAsync(id);
                if (skill != null)
                {
                    skill.IsDeleted = true;
                    await _userSkillRepository.Update(skill);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateSkill(AddSkillViewModel skill)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                var userSkill = await _userSkillRepository.GetByIdAsync(skill.Id);
                if (userSkill != null)
                {
                    userSkill.Id = userSkill.Id;
                    userSkill.UserId = userSkill.UserId;
                    userSkill.Skill = skill.Name;
                    userSkill.ExperienceLevel = skill.Level;
                    await _userSkillRepository.Update(userSkill);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<AddSkillViewModel>> GetSkills(string id)
        {
            // throw new NotImplementedException();
            //if target property(specify in Select(List<UserSkill>) is list use SelectMany to flattern)
            //Distinct used for remove duplicate entities
            var _userskills = await _userSkillRepository.FindAsync(x => x.UserId == id);
            var userskills = _userskills.Where(x => !x.IsDeleted)
                .Select(x => new List<UserSkill>() { x })
                .SelectMany(x => x).Distinct();

            List<AddSkillViewModel> languages = new List<AddSkillViewModel>();

            foreach (var item in userskills)
            {
                languages.Add(ViewModelFromSkill(item));
            }


            return languages;

        }

        #endregion

        #region Experience component methods

        public async Task<bool> AddNewExperience(ExperienceViewModel experience)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                if (experience.CurrentUserId != null)
                {
                    var userexperience = new UserExperience();
                    userexperience.Company = experience.Company;
                    userexperience.Responsibilities = experience.Responsibilities;
                    userexperience.Position = experience.Position;
                    userexperience.Start = experience.Start;
                    userexperience.End = experience.End;
                    userexperience.UserId = experience.CurrentUserId;
                    userexperience.IsDeleted = false;
                    await _userExperienceRepository.Add(userexperience);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteExperience(string id)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                var experience = await _userExperienceRepository.GetByIdAsync(id);
                if (experience != null)
                {
                    experience.IsDeleted = true;
                    await _userExperienceRepository.Update(experience);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateExperience(ExperienceViewModel experience)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                var userExperience = await _userExperienceRepository.GetByIdAsync(experience.Id);
                if (userExperience != null)
                {
                    userExperience.Id = userExperience.Id;
                    userExperience.UserId = userExperience.UserId;
                    userExperience.Company = experience.Company;
                    userExperience.End = experience.End;
                    userExperience.Position = experience.Position;
                    userExperience.Responsibilities = experience.Responsibilities;
                    userExperience.Start = experience.Start;
                    await _userExperienceRepository.Update(userExperience);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<ExperienceViewModel>> GetExperience(string id)
        {
            // throw new NotImplementedException();
            var _userexperience = await _userExperienceRepository.FindAsync(x => x.UserId == id);
            var userexperience = _userexperience.Where(x => !x.IsDeleted).Select(x => new List<UserExperience>() { x }).SelectMany(x => x).Distinct();

            List<ExperienceViewModel> experiences = new List<ExperienceViewModel>();

            foreach (var item in userexperience)
            {
                experiences.Add(ViewModelFromExperience(item));
            }


            return experiences;

        }

        #endregion


        /// <summary>
        /// Get Talent(@kushan)
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            //Your code here;
            // throw new NotImplementedException();

            var user = await _userRepository.GetByIdAsync(Id);

            if (user != null)
            {
                var videoUrl = string.IsNullOrWhiteSpace(user.VideoName)
                           ? ""
                           : await _fileService.GetFileURL(user.VideoName, FileType.UserVideo);

                var skills = user.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                var language = user.Languages.Select(x => ViewModelFromLaguage(x)).ToList();
                var certifications = user.Certifications.Select(x => ViewModelFromCertification(x)).ToList();
                var experience = user.Experience.Select(x => ViewModelFromExperience(x)).ToList();
                var education = user.Education.Select(x => ViewModelFromEducation(x)).ToList();

                var result = new TalentProfileViewModel
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    MiddleName = user.MiddleName,
                    LastName = user.LastName,
                    Gender = user.Gender,
                    Email = user.Email,
                    Phone = user.Phone,
                    MobilePhone = user.MobilePhone,
                    IsMobilePhoneVerified = user.IsMobilePhoneVerified,
                    Summary = user.Summary,
                    Description = user.Description,
                    LinkedAccounts = user.LinkedAccounts,
                    Nationality = user.Nationality,
                    Address = user.Address,
                    VisaStatus = user.VisaStatus,
                    VisaExpiryDate = user.VisaExpiryDate,
                    ProfilePhoto = user.ProfilePhoto,
                    ProfilePhotoUrl = user.ProfilePhotoUrl,
                    VideoName = user.VideoName,
                    VideoUrl = videoUrl,
                    Languages = language,
                    Certifications = certifications,
                    Experience = experience,
                    Education = education,
                    Skills = skills,
                    JobSeekingStatus = user.JobSeekingStatus,
                };

                return result;
            }

            return null;
        }

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
            //Your code here;
            // throw new NotImplementedException();
            try
            {
                if (model.Id != null)
                {
                    User existingUser = (await _userRepository.GetByIdAsync(model.Id));
                    existingUser.FirstName = model.FirstName;
                    existingUser.LastName = model.LastName;
                    existingUser.Email = model.Email;
                    existingUser.Phone = model.Phone;
                    existingUser.UpdatedBy = updaterId;
                    existingUser.UpdatedOn = DateTime.Now;
                    existingUser.LinkedAccounts = model.LinkedAccounts;
                    existingUser.Address = model.Address;
                    existingUser.Description = model.Description;
                    existingUser.Summary = model.Summary;
                    existingUser.Nationality = model.Nationality;
                    existingUser.VisaStatus = model.VisaStatus;
                    existingUser.VisaExpiryDate = model.VisaExpiryDate;
                    existingUser.JobSeekingStatus = model.JobSeekingStatus;
                    await _userRepository.Update(existingUser);
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        
        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

      
        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        //Photoupload by Kushan
        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {
            try
            {
                var fileExtension = Path.GetExtension(file.FileName);
                List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

                if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
                {
                    return false;
                }

                var profile = (await _userRepository.Get(x => x.Id == talentId)).SingleOrDefault();

                if (profile == null)
                {
                    return false;
                }

                var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

                if (!string.IsNullOrWhiteSpace(newFileName))
                {
                    var oldFileName = profile.ProfilePhoto;

                    if (!string.IsNullOrWhiteSpace(oldFileName))
                    {
                        await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                    }

                    string photourl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);
                    if(!string.IsNullOrWhiteSpace(photourl))
                    {
                        profile.ProfilePhoto = newFileName;
                        profile.ProfilePhotoUrl = photourl;
                        await _userRepository.Update(profile);
                        return true;
                    }

                }

                return false;
            }
            catch(MongoException e)
            {
                return false;
            }

        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            var users = (await _userRepository.Get(x => x.IsDeleted == false)).Skip(position).Take(increment).ToList();
           // var talentlist = await _userRepository.Get(x => x.IsDeleted == false);
           // var users = talentlist.Skip(position).Take(increment); 

            List<TalentSnapshotViewModel> talents=null;

            if (users.Count()!=0)
            {
                talents = new List<TalentSnapshotViewModel>();
                List<string> skillList=null;
                string currentemployment="";
                string level="";

                foreach (var user in users)
                {
                   var skills= await this.GetSkills(user.Id);

                    if(skills.Count()!=0)
                    {
                        skillList = new List<string>();
                        foreach (var skill in skills)
                        {
                            skillList.Add(skill.Name);
                        }
                    }

                    var experiences = await this.GetExperience(user.Id);
                    
                    if(experiences.Count()!=0)
                    {
                        var experience = experiences.LastOrDefault();
                        currentemployment = experience.Company;
                        level = experience.Position;
                    }

                    var result = new TalentSnapshotViewModel
                    {
                        Id = user.Id,
                        Name = user.FirstName,
                        PhotoId = user.ProfilePhotoUrl,
                        VideoUrl = string.IsNullOrWhiteSpace(user.VideoName)
                           ? ""
                           : await _fileService.GetFileURL(user.VideoName, FileType.UserVideo),
                        CVUrl = string.IsNullOrWhiteSpace(user.CvName) ? "" : await _fileService.GetFileURL(user.CvName, FileType.UserCV),
                        Summary = user.Summary,
                        CurrentEmployment = string.IsNullOrWhiteSpace(currentemployment) ? "" : currentemployment,
                        Visa = user.VisaStatus,
                        Level= string.IsNullOrWhiteSpace(level) ? "" : level,
                        Skills=skillList,

                    };

                    talents.Add(result);
                }             

                return talents;
            }

            return null;
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill,
                CurrentUserId=skill.UserId
            };
        }

        #region AutherKushan
        protected AddLanguageViewModel ViewModelFromLaguage(UserLanguage userlanguage)
        {
            return new AddLanguageViewModel
            {
                Id = userlanguage.Id,
                Level = userlanguage.LanguageLevel,
                Name = userlanguage.Language,
                CurrentUserId = userlanguage.UserId
            };
        }

        protected AddEducationViewModel ViewModelFromEducation(UserEducation usereducation)
        {
            return new AddEducationViewModel
            {
                Id = usereducation.Id,
                Country = usereducation.Country,
                Title = usereducation.Title,
                YearOfGraduation = usereducation.YearOfGraduation,
                Degree = usereducation.Degree,
                InstituteName = usereducation.InstituteName
            };
        }

        protected AddCertificationViewModel ViewModelFromCertification(UserCertification userCertification)
        {
            return new AddCertificationViewModel
            {
                Id = userCertification.Id,
                CertificationFrom = userCertification.CertificationFrom,
                CertificationName = userCertification.CertificationName,
                CertificationYear = userCertification.CertificationYear
            };
        }

        protected ExperienceViewModel ViewModelFromExperience(UserExperience userExperience)
        {
            return new ExperienceViewModel
            {
                Id = userExperience.Id,
                Company = userExperience.Company,
                Position = userExperience.Position,
                Responsibilities = userExperience.Responsibilities,
                Start = userExperience.Start,
                End = userExperience.End,
                CurrentUserId=userExperience.UserId
            };
        }

        #endregion

        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }
         
        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}
