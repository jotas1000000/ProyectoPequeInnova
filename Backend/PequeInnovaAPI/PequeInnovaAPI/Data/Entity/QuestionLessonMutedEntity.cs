using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data.Entity
{
    public class QuestionLessonMutedEntity
    {
        public string Question { get; set; }
        public List<Tuple<string,bool>> answers;
    }
}
