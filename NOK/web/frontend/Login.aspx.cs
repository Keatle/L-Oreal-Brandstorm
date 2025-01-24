using AdonisMen.ServiceReference1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AdonisMen
{
    public partial class Login : System.Web.UI.Page
    {
        Service1Client sr = new Service1Client();
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void Login_Click(object sender, EventArgs e)
        {
            int id = sr.userLogin(username.Value, password.Value);
            if (!id.Equals(-1))
            {
                Session["LoggedInUser"] = id;
                Session["LoggedInAdmin"] = id;
                Response.Redirect("Home.aspx");
            }
            else
            {
                Response.Write("Invalid credentials! Please try again");
            }
        }
    }
}