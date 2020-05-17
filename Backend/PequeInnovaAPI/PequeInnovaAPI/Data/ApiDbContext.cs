using AutoMapper;
using PequeInnovaAPI.Data.Entity;
﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PequeInnovaAPI.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data
{
    public class ApiDbContext:IdentityDbContext<ApplicationUser>
    {
        public DbSet<AreaEntity> Areas { get; set; }
        public DbSet<CourseEntity> Courses { get; set; }
        public DbSet<SectionEntity> Sections{ get; set; }
        public DbSet<LessonEntity> Lessons { get; set; }
        public DbSet<PracticeEntity> Practices { get; set; }
        public DbSet<CommentEntity> Comments { get; set; }
        public DbSet<InscriptionEntity> Inscriptions { get; set; }
        public DbSet<TeachingEntity> Teachings { get; set; }
        public DbSet<AssignmentEntity> Assignments { get; set; }
        public DbSet<QuestionEntity> Questions { get; set; }
        public DbSet<SchoolEntity> Schools{ get; set; }
        public ApiDbContext(DbContextOptions<ApiDbContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AreaEntity>().ToTable("Areas");
            modelBuilder.Entity<AreaEntity>().HasMany(a => a.Courses).WithOne(b => b.Area);
            modelBuilder.Entity<AreaEntity>().HasMany(a => a.Assignments).WithOne().HasForeignKey(ass=>ass.AreaId).IsRequired();//Add
            modelBuilder.Entity<AreaEntity>().Property(a => a.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<CourseEntity>().ToTable("Courses");
            modelBuilder.Entity<CourseEntity>().HasMany(a => a.Lessons).WithOne(b => b.Course);
            modelBuilder.Entity<CourseEntity>().HasMany(a => a.Inscriptions).WithOne(i => i.Course);//.HasForeignKey(ins=>ins.CourseId).IsRequired();//Add
            modelBuilder.Entity<CourseEntity>().HasMany(a => a.Teachings).WithOne().HasForeignKey(t => t.CourseId).IsRequired();//Add
            modelBuilder.Entity<CourseEntity>().Property(b => b.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<CourseEntity>().HasOne(b => b.Area).WithMany(a => a.Courses);
            /*
            modelBuilder.Entity<SectionEntity>().ToTable("Sections");
            modelBuilder.Entity<SectionEntity>().HasMany(a => a.Lessons).WithOne(b => b.Section);
            modelBuilder.Entity<SectionEntity>().HasMany(a => a.Practices).WithOne(b => b.Section);
            modelBuilder.Entity<SectionEntity>().HasMany(a => a.Comments).WithOne().HasForeignKey(c=>c.SectionId).IsRequired();//Add
            modelBuilder.Entity<SectionEntity>().Property(b => b.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<SectionEntity>().HasOne(b => b.Course).WithMany(a => a.Sections);
            */
            modelBuilder.Entity<LessonEntity>().ToTable("Lessons");
            modelBuilder.Entity<LessonEntity>().Property(b => b.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<LessonEntity>().HasOne(b => b.Course).WithMany(a => a.Lessons);
            modelBuilder.Entity<LessonEntity>().HasMany(b => b.Comments).WithOne(c=>c.Lesson);
            modelBuilder.Entity<LessonEntity>().HasMany(b => b.Questions).WithOne(c => c.Lesson);

            modelBuilder.Entity<QuestionEntity>().ToTable("Questions");
            modelBuilder.Entity<QuestionEntity>().HasOne(q => q.Lesson).WithMany(l => l.Questions);
            modelBuilder.Entity<QuestionEntity>().Property(q => q.Id).ValueGeneratedOnAdd();
            /*
            modelBuilder.Entity<PracticeEntity>().ToTable("Practices");
            modelBuilder.Entity<PracticeEntity>().Property(b => b.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<PracticeEntity>().HasOne(b => b.Section).WithMany(a => a.Practices);
            */
            modelBuilder.Entity<ApplicationUser>(b =>
            {
                b.HasMany(u => u.Comments)
                    .WithOne()
                    .HasForeignKey(uc => uc.UserId)
                    .IsRequired();

                b.HasMany(u => u.Inscriptions)
                    .WithOne()
                    .HasForeignKey(i => i.UserId)
                    .IsRequired();

                b.HasMany(u => u.Teachings)
                    .WithOne()
                    .HasForeignKey(t => t.UserId)
                    .IsRequired();

                b.HasMany(u => u.Assignment)
                    .WithOne()
                    .HasForeignKey(a => a.UserId)
                    .IsRequired();
            });

            modelBuilder.Entity<CommentEntity>().ToTable("Comments");
            //modelBuilder.Entity<CommentEntity>().HasOne(d => d.UserId);
            modelBuilder.Entity<CommentEntity>().Property(c => c.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<InscriptionEntity>().ToTable("Inscriptions");
            modelBuilder.Entity<InscriptionEntity>().HasOne(i => i.Course).WithMany(c => c.Inscriptions);
            modelBuilder.Entity<InscriptionEntity>().Property(i => i.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<TeachingEntity>().ToTable("Teachings");
            modelBuilder.Entity<TeachingEntity>().Property(t => t.Id).ValueGeneratedOnAdd();
            
            modelBuilder.Entity<AssignmentEntity>().ToTable("Assingnments");
            modelBuilder.Entity<AssignmentEntity>().Property(a => a.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<SchoolEntity>().ToTable("Schools");
            modelBuilder.Entity<SchoolEntity>().Property(a => a.Id).ValueGeneratedOnAdd();
        }

       
    }
        
           
}
