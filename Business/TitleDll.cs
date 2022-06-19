using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;

namespace Business
{
    public class TitleDll : Bll
    {
        public HRMEntity<title> _titleRepo;

        public List<title> GetTitles()
        {
            var result = new List<title>();

            result = _titleRepo.Get().ToList();

            return result;
        }

        public title GetTitle(string name)
        {
            return _titleRepo.Get("title_name", name);
        }

        public title GetTitleById(string id)
        {
            return _titleRepo.Get("title_id", id);
        }

        public bool UpdateTitle(title tit)
        {
            try
            {
                _titleRepo.Update(tit);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveTitle(title tit)
        {
            // var deleted = _.Get("id", workTimeId);
            try
            {
                _titleRepo.Remove(tit);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreateTitle(title tit)
        {
            try
            {
                _titleRepo.Insert(tit);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
