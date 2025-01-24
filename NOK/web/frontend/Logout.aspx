<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="Logout.aspx.cs" Inherits="AdonisMen.Logout" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="contact-us">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <form id="form-input" action="">
                        <div class="reg_input">
                            <h1>Logout</h1>
                        </div>
                        <div class="reg_input">
                            <asp:Button Text="Logout" ID="btnLogout" runat="server" OnClick="Logout_CLick" />
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
