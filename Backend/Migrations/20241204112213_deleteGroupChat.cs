using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class deleteGroupChat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "chat_in_group");

            migrationBuilder.DropTable(
                name: "user_in_group_chat");

            migrationBuilder.DropTable(
                name: "group_chats");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_updated",
                table: "comments",
                type: "timestamp",
                nullable: true,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_created",
                table: "comments",
                type: "timestamp",
                nullable: true,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "comments",
                type: "text",
                nullable: true,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "text")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "date_updated",
                table: "comments",
                type: "timestamp",
                nullable: false,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldNullable: true,
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_created",
                table: "comments",
                type: "timestamp",
                nullable: false,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldNullable: true,
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.UpdateData(
                table: "comments",
                keyColumn: "content",
                keyValue: null,
                column: "content",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "comments",
                type: "text",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "group_chats",
                columns: table => new
                {
                    group_chat_id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    main_topic = table.Column<int>(type: "int(11)", nullable: false, defaultValueSql: "'1'"),
                    cover_photo = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    group_chat_name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.group_chat_id);
                    table.ForeignKey(
                        name: "fk_topic_group",
                        column: x => x.main_topic,
                        principalTable: "main_topic",
                        principalColumn: "topic_id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "chat_in_group",
                columns: table => new
                {
                    chat_id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    from_user = table.Column<int>(type: "int(11)", nullable: false),
                    group_chat_id = table.Column<int>(type: "int(11)", nullable: false),
                    media_id = table.Column<int>(type: "int(11)", nullable: true),
                    content = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_general_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    date_created = table.Column<DateTime>(type: "timestamp", nullable: true, defaultValueSql: "current_timestamp()"),
                    is_read = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    is_recall = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    Otheruser = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.chat_id);
                    table.ForeignKey(
                        name: "fk_chatInGroup_media",
                        column: x => x.media_id,
                        principalTable: "media",
                        principalColumn: "media_id");
                    table.ForeignKey(
                        name: "fk_chat_in_group_group_chat_id",
                        column: x => x.group_chat_id,
                        principalTable: "group_chats",
                        principalColumn: "group_chat_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_group_user",
                        column: x => x.from_user,
                        principalTable: "users",
                        principalColumn: "user_id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "user_in_group_chat",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int(11)", nullable: false),
                    group_chat_id = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.user_id, x.group_chat_id })
                        .Annotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                    table.ForeignKey(
                        name: "fk_user_in_group_chat_group_chat_id",
                        column: x => x.group_chat_id,
                        principalTable: "group_chats",
                        principalColumn: "group_chat_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_user_in_group_chat_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "fk_chat_in_group_group_chat_id",
                table: "chat_in_group",
                column: "group_chat_id");

            migrationBuilder.CreateIndex(
                name: "fk_chat_in_group_user_id",
                table: "chat_in_group",
                column: "from_user");

            migrationBuilder.CreateIndex(
                name: "IX_chat_in_group_media_id",
                table: "chat_in_group",
                column: "media_id");

            migrationBuilder.CreateIndex(
                name: "fk_topic_group",
                table: "group_chats",
                column: "main_topic");

            migrationBuilder.CreateIndex(
                name: "fk_user_in_group_chat_group_chat_id",
                table: "user_in_group_chat",
                column: "group_chat_id");
        }
    }
}
