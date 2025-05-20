using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ITJobs.Infrastructure.SqlServer.Migrations
{
    /// <inheritdoc />
    public partial class AddMainImageToPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MainImage",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainImage",
                table: "Posts");
        }
    }
}
