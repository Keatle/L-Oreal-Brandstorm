using AdonisMen.ServiceReference1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AdonisMen
{
    public partial class Site1 : System.Web.UI.MasterPage
    {
        Service1Client sr = new Service1Client();
        protected void Page_Load(object sender, EventArgs e)
        {
            guest.Visible = true;
            customer.Visible = false;
            admin.Visible = false;
            if (Session["LoggedInUser"] != null)
            {
                guest.Visible = false;
                customer.Visible = true;
                admin.Visible = false;
            }
            else if (Session["LoggedInAdmin"] != null)
            {
                guest.Visible = false;
                customer.Visible = false;
                admin.Visible = true;
            }
        }
    }
}