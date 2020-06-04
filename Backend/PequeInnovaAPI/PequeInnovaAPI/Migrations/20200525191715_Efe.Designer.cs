﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PequeInnovaAPI.Data;

namespace PequeInnovaAPI.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    [Migration("20200525191715_Efe")]
    partial class Efe
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.AreaEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Description");

                    b.Property<string>("Image");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.HasKey("Id");

                    b.ToTable("Areas");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.AssignmentEntity", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AreaId");

                    b.Property<DateTime>("CreateDate");

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.HasIndex("UserId");

                    b.ToTable("Assingnments");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.CommentEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CommentDate");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Description");

                    b.Property<int?>("LessonId");

                    b.Property<int?>("SectionEntityId");

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.HasIndex("LessonId");

                    b.HasIndex("SectionEntityId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.CourseEntity", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AreaId");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("Image");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.InscriptionEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CourseId");

                    b.Property<DateTime>("CreateDate");

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("UserId");

                    b.ToTable("Inscriptions");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.LessonEntity", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CourseId");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("Document");

                    b.Property<int>("Order");

                    b.Property<int?>("SectionEntityId");

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.Property<string>("Type");

                    b.Property<string>("URLVideo")
                        .IsRequired();

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("SectionEntityId");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.PracticeEntity", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("FalseAnswer1")
                        .IsRequired();

                    b.Property<string>("FalseAnswer2")
                        .IsRequired();

                    b.Property<string>("FalseAnswer3")
                        .IsRequired();

                    b.Property<string>("Question")
                        .IsRequired();

                    b.Property<int?>("SectionId");

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.Property<string>("TrueAnswer")
                        .IsRequired();

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.HasKey("Id");

                    b.HasIndex("SectionId");

                    b.ToTable("Practices");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.QuestionEntity", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("FalseAnswer1")
                        .IsRequired();

                    b.Property<string>("FalseAnswer2")
                        .IsRequired();

                    b.Property<string>("FalseAnswer3")
                        .IsRequired();

                    b.Property<int?>("LessonId");

                    b.Property<string>("Question")
                        .IsRequired();

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Title");

                    b.Property<string>("TrueAnswer")
                        .IsRequired();

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.HasKey("Id");

                    b.HasIndex("LessonId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.SchoolEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.HasKey("Id");

                    b.ToTable("Schools");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.SectionEntity", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CourseId");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("LessonType")
                        .IsRequired();

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Sections");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.TeachingEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CourseId");

                    b.Property<DateTime>("CreateDate");

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("UserId");

                    b.ToTable("Teachings");
                });

            modelBuilder.Entity("PequeInnovaAPI.Models.Auth.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<int>("Age");

                    b.Property<DateTime>("Birthday");

                    b.Property<string>("City");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Degree");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("Grade");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("Name");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("School");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("State");

                    b.Property<bool>("Status");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("Uid");

                    b.Property<DateTime>("UpdateDate");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("PequeInnovaAPI.Models.Auth.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("PequeInnovaAPI.Models.Auth.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PequeInnovaAPI.Models.Auth.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("PequeInnovaAPI.Models.Auth.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.AssignmentEntity", b =>
                {
                    b.HasOne("PequeInnovaAPI.Data.Entity.AreaEntity")
                        .WithMany("Assignments")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PequeInnovaAPI.Models.Auth.ApplicationUser")
                        .WithMany("Assignment")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.CommentEntity", b =>
                {
                    b.HasOne("PequeInnovaAPI.Data.Entity.LessonEntity", "Lesson")
                        .WithMany("Comments")
                        .HasForeignKey("LessonId");

                    b.HasOne("PequeInnovaAPI.Data.Entity.SectionEntity")
                        .WithMany("Comments")
                        .HasForeignKey("SectionEntityId");

                    b.HasOne("PequeInnovaAPI.Models.Auth.ApplicationUser")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.CourseEntity", b =>
                {
                    b.HasOne("PequeInnovaAPI.Data.Entity.AreaEntity", "Area")
                        .WithMany("Courses")
                        .HasForeignKey("AreaId");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.InscriptionEntity", b =>
                {
                    b.HasOne("PequeInnovaAPI.Data.Entity.CourseEntity", "Course")
                        .WithMany("Inscriptions")
                        .HasForeignKey("CourseId");

                    b.HasOne("PequeInnovaAPI.Models.Auth.ApplicationUser")
                        .WithMany("Inscriptions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.LessonEntity", b =>
                {
                    b.HasOne("PequeInnovaAPI.Data.Entity.CourseEntity", "Course")
                        .WithMany("Lessons")
                        .HasForeignKey("CourseId");

                    b.HasOne("PequeInnovaAPI.Data.Entity.SectionEntity")
                        .WithMany("Lessons")
                        .HasForeignKey("SectionEntityId");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.PracticeEntity", b =>
                {
                    b.HasOne("PequeInnovaAPI.Data.Entity.SectionEntity", "Section")
                        .WithMany("Practices")
                        .HasForeignKey("SectionId");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.QuestionEntity", b =>
                {
                    b.HasOne("PequeInnovaAPI.Data.Entity.LessonEntity", "Lesson")
                        .WithMany("Questions")
                        .HasForeignKey("LessonId");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.SectionEntity", b =>
                {
                    b.HasOne("PequeInnovaAPI.Data.Entity.CourseEntity", "Course")
                        .WithMany()
                        .HasForeignKey("CourseId");
                });

            modelBuilder.Entity("PequeInnovaAPI.Data.Entity.TeachingEntity", b =>
                {
                    b.HasOne("PequeInnovaAPI.Data.Entity.CourseEntity")
                        .WithMany("Teachings")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PequeInnovaAPI.Models.Auth.ApplicationUser")
                        .WithMany("Teachings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
