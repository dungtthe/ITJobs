using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ITJobs.Infrastructure.SqlServer.Migrations
{
    /// <inheritdoc />
    public partial class AddTitleAndShortContentToPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ShortContent",
                table: "Posts",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Posts",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShortContent",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Posts");
        }
    }
}
