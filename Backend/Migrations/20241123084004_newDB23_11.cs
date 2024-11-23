using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class newDB23_11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "hash_code",
                table: "media",
                type: "varchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                collation: "utf8mb4_general_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "chat_in_message",
                type: "varchar(255)",
                maxLength: 255,
                nullable: true,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AddColumn<int>(
                name: "media_id",
                table: "chat_in_message",
                type: "int(1)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_created",
                table: "chat_in_group",
                type: "timestamp",
                nullable: true,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "chat_in_group",
                type: "text",
                nullable: true,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "text")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AddColumn<int>(
                name: "Otheruser",
                table: "chat_in_group",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "is_read",
                table: "chat_in_group",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_recall",
                table: "chat_in_group",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "media_id",
                table: "chat_in_group",
                type: "int(11)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "media_message",
                columns: table => new
                {
                    media_id = table.Column<int>(type: "int(11)", nullable: false),
                    message_id = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_media_message", x => new { x.media_id, x.message_id });
                    table.ForeignKey(
                        name: "fk_media_message",
                        column: x => x.media_id,
                        principalTable: "media",
                        principalColumn: "media_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_message_media",
                        column: x => x.message_id,
                        principalTable: "messages",
                        principalColumn: "messages_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_chat_in_message_media_id",
                table: "chat_in_message",
                column: "media_id");

            migrationBuilder.CreateIndex(
                name: "IX_chat_in_group_media_id",
                table: "chat_in_group",
                column: "media_id");

            migrationBuilder.CreateIndex(
                name: "IX_media_message_message_id",
                table: "media_message",
                column: "message_id");

            migrationBuilder.AddForeignKey(
                name: "fk_chatInGroup_media",
                table: "chat_in_group",
                column: "media_id",
                principalTable: "media",
                principalColumn: "media_id");

            migrationBuilder.AddForeignKey(
                name: "fk_media_chat",
                table: "chat_in_message",
                column: "media_id",
                principalTable: "media",
                principalColumn: "media_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_chatInGroup_media",
                table: "chat_in_group");

            migrationBuilder.DropForeignKey(
                name: "fk_media_chat",
                table: "chat_in_message");

            migrationBuilder.DropTable(
                name: "media_message");

            migrationBuilder.DropIndex(
                name: "IX_chat_in_message_media_id",
                table: "chat_in_message");

            migrationBuilder.DropIndex(
                name: "IX_chat_in_group_media_id",
                table: "chat_in_group");

            migrationBuilder.DropColumn(
                name: "hash_code",
                table: "media");

            migrationBuilder.DropColumn(
                name: "media_id",
                table: "chat_in_message");

            migrationBuilder.DropColumn(
                name: "Otheruser",
                table: "chat_in_group");

            migrationBuilder.DropColumn(
                name: "is_read",
                table: "chat_in_group");

            migrationBuilder.DropColumn(
                name: "is_recall",
                table: "chat_in_group");

            migrationBuilder.DropColumn(
                name: "media_id",
                table: "chat_in_group");

            migrationBuilder.UpdateData(
                table: "chat_in_message",
                keyColumn: "content",
                keyValue: null,
                column: "content",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "chat_in_message",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_created",
                table: "chat_in_group",
                type: "timestamp",
                nullable: false,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldNullable: true,
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.UpdateData(
                table: "chat_in_group",
                keyColumn: "content",
                keyValue: null,
                column: "content",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "chat_in_group",
                type: "text",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");
        }
    }
}
