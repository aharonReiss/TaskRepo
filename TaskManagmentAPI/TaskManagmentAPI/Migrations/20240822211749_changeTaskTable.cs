using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagmentAPI.Migrations
{
    /// <inheritdoc />
    public partial class changeTaskTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskS",
                table: "TaskS");

            migrationBuilder.RenameTable(
                name: "TaskS",
                newName: "Tasks");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks");

            migrationBuilder.RenameTable(
                name: "Tasks",
                newName: "TaskS");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskS",
                table: "TaskS",
                column: "Id");
        }
    }
}
