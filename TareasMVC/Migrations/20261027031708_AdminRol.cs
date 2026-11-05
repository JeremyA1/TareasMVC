using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TareasMVC.Migrations
{
    /// <inheritdoc />
    public partial class AdminRol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
        IF NOT EXISTS (
            SELECT 1
            FROM AspNetRoles
            WHERE Id = 'a4b29ed2-44fc-4710-8ec8-e20df0832441'
        )
        BEGIN
            INSERT INTO AspNetRoles (Id, [Name], [NormalizedName])
            VALUES (
                'a4b29ed2-44fc-4710-8ec8-e20df0832441',
                'admin',
                'ADMIN'
            );
        END;
    ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
        DELETE FROM AspNetRoles
        WHERE Id = 'a4b29ed2-44fc-4710-8ec8-e20df0832441';
    ");
        }
    }
}
