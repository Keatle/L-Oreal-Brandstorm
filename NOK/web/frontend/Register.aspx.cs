using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AdonisMen.ServiceReference1;

namespace AdonisMen
{
    
    public partial class Register : System.Web.UI.Page
    {
        Service1Client sr = new Service1Client();
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void Register_Click(object sender, EventArgs e)
        {
            bool newUser = sr.registerUser(name.Value, surname.Value, Convert.ToInt32(phone.Value), email.Value, password.Value, "end-user");
            if (newUser.Equals(true))
            {
                Response.Redirect("Login.aspx");
            }
            else
            {
                Response.Write("Something went wrong!!!");
            }
        }
    }
}