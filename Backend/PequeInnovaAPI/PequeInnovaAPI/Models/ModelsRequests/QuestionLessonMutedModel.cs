using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models.ModelsRequests
{
    public class QuestionLessonMutedModel
    {
        public string Question { get; set; }
        public List<Tuple<string, bool>> answers;
    }
}
