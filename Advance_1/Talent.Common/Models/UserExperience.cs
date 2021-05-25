using Talent.Common.Contracts;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Talent.Common.Models
{
    public class UserExperience:IMongoCommon
    {
        public bool IsDeleted { get; set; }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String Id { get; set; }
        public String Company { get; set; }
        public String Position { get; set; }
        public String Responsibilities { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string UserId { get; set; }
    }
}
