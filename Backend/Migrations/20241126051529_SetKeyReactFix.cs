using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class SetKeyReactFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_user_cloud",
                table: "reacts_comment");

            migrationBuilder.DropPrimaryKey(
                name: "PRIMARY",
                table: "reacts_comment");

            migrationBuilder.AddPrimaryKey(
                name: "PK_reacts_post",
                table: "reacts_post",
                columns: new[] { "post_id", "user_id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_reacts_comment",
                table: "reacts_comment",
                columns: new[] { "user_id", "comment_id" });

            migrationBuilder.CreateIndex(
                name: "fk_reacts_comment_user_id",
                table: "reacts_comment",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_user_cloud",
                table: "reacts_comment",
                column: "user_id",
                principalTable: "users",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_user_cloud",
                table: "reacts_comment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_reacts_post",
                table: "reacts_post");

            migrationBuilder.DropPrimaryKey(
                name: "PK_reacts_comment",
                table: "reacts_comment");

            migrationBuilder.DropIndex(
                name: "fk_reacts_comment_user_id",
                table: "reacts_comment");

            migrationBuilder.AddPrimaryKey(
                name: "PRIMARY",
                table: "reacts_comment",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_user_cloud",
                table: "reacts_comment",
                column: "user_id",
                principalTable: "users",
                principalColumn: "user_id");
        }
    }
}
