using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class newDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_media",
                table: "post_media");

            migrationBuilder.DropForeignKey(
                name: "fk_post",
                table: "post_media");

            migrationBuilder.DropTable(
                name: "user_media");

            migrationBuilder.DropIndex(
                name: "fk_media",
                table: "post_media");

            migrationBuilder.RenameIndex(
                name: "fk_post",
                table: "post_media",
                newName: "IX_post_media_post_id");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_created",
                table: "posts",
                type: "timestamp",
                nullable: true,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.AddColumn<bool>(
                name: "is_cover_photo",
                table: "posts",
                type: "tinyint(1)",
                nullable: true,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "is_profile_picture",
                table: "posts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "is_visible",
                table: "posts",
                type: "tinyint(1)",
                nullable: true,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_post_media_media_media_id",
                table: "post_media",
                column: "media_id",
                principalTable: "media",
                principalColumn: "media_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_post_media_posts_post_id",
                table: "post_media",
                column: "post_id",
                principalTable: "posts",
                principalColumn: "post_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_post_media_media_media_id",
                table: "post_media");

            migrationBuilder.DropForeignKey(
                name: "FK_post_media_posts_post_id",
                table: "post_media");

            migrationBuilder.DropColumn(
                name: "is_cover_photo",
                table: "posts");

            migrationBuilder.DropColumn(
                name: "is_profile_picture",
                table: "posts");

            migrationBuilder.DropColumn(
                name: "is_visible",
                table: "posts");

            migrationBuilder.RenameIndex(
                name: "IX_post_media_post_id",
                table: "post_media",
                newName: "fk_post");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_created",
                table: "posts",
                type: "timestamp",
                nullable: false,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldNullable: true,
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.CreateTable(
                name: "user_media",
                columns: table => new
                {
                    media_id = table.Column<int>(type: "int(11)", nullable: false),
                    user_id = table.Column<int>(type: "int(11)", nullable: false),
                    is_cover_picture = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    is_profile_picture = table.Column<bool>(type: "tinyint(1)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_media", x => new { x.media_id, x.user_id });
                    table.ForeignKey(
                        name: "fk_user_media_media_id",
                        column: x => x.media_id,
                        principalTable: "media",
                        principalColumn: "media_id");
                    table.ForeignKey(
                        name: "fk_user_media_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "fk_media",
                table: "post_media",
                column: "media_id");

            migrationBuilder.CreateIndex(
                name: "fk_user_media_media_id",
                table: "user_media",
                column: "media_id");

            migrationBuilder.CreateIndex(
                name: "fk_user_media_user_id",
                table: "user_media",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_media_user_id_is_cover_picture",
                table: "user_media",
                columns: new[] { "user_id", "is_cover_picture" },
                unique: true,
                filter: "[is_cover_picture] = 1");

            migrationBuilder.CreateIndex(
                name: "IX_user_media_user_id_is_profile_picture",
                table: "user_media",
                columns: new[] { "user_id", "is_profile_picture" },
                unique: true,
                filter: "[is_profile_picture] = 1");

            migrationBuilder.AddForeignKey(
                name: "fk_media",
                table: "post_media",
                column: "media_id",
                principalTable: "media",
                principalColumn: "media_id");

            migrationBuilder.AddForeignKey(
                name: "fk_post",
                table: "post_media",
                column: "post_id",
                principalTable: "posts",
                principalColumn: "post_id");
        }
    }
}
