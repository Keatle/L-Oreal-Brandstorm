<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="AdonisMen.Login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <div class="contact-us">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <form id="form-input" action="">
                        <div class="reg_input">
                            <h1>Login</h1>
                        </div>
                        <div class="reg_input">
                            <input name="username" type="email" id="username" runat="server" placeholder="Enter your Username..." required="" />
                        </div>
                        <div class="reg_input">
                            <input name="password" type="password" id="password" runat="server" placeholder="Enter your Password..." required="" />
                        </div>

                        <div class="reg_input">
                            <asp:Button Text="Login" ID="btnLogin" OnClick="Login_Click" runat="server" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

</asp:Content>
