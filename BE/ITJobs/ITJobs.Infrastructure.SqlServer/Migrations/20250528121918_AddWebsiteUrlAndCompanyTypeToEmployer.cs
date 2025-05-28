using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ITJobs.Infrastructure.SqlServer.Migrations
{
    /// <inheritdoc />
    public partial class AddWebsiteUrlAndCompanyTypeToEmployer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyType",
                table: "Employers",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WebsiteUrl",
                table: "Employers",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyType",
                table: "Employers");

            migrationBuilder.DropColumn(
                name: "WebsiteUrl",
                table: "Employers");
        }
    }
}
