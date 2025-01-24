<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="AdonisMen.Register" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="contact-us">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <form id="form-input" action="">
                        <div class="reg_input">
                            <h1>Register</h1>
                        </div>                        <div class="reg_input">
                            <input name="name" type="text" id="name" runat="server" placeholder="Enter your Name..." required="" />
                        </div>
                        <div class="reg_input">
                            <input name="surname" type="text" id="surname" runat="server" placeholder="Enter your Surname..." required="" />
                        </div>
                        <div class="reg_input">
                            <input name="phone" type="text" id="phone" runat="server" placeholder="Enter your Phone Number..." required="" />
                        </div>
                        <div class="reg_input">
                            <input name="email" type="email" id="email" runat="server" placeholder="Enter your Email..." required="" />
                        </div>
                        <div class="reg_input">
                            <input name="password" type="password" id="password" runat="server" placeholder="Enter your Password..." required="" />
                        </div>
                        <div class="reg_input">
                            <asp:Button Text="Register" ID="btnRegister" OnClick="Register_Click" runat="server" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

</asp:Content>
