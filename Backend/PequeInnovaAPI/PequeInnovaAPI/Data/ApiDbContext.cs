using AutoMapper;
using PequeInnovaAPI.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PequeInnovaAPI.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> wind)
             : base(wind)

        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AreaEntity>().ToTable("Areas");
            modelBuilder.Entity<AreaEntity>().HasMany(a => a.Courses).WithOne(b => b.Area);
            modelBuilder.Entity<AreaEntity>().Property(a => a.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<CourseEntity>().ToTable("Courses");
            modelBuilder.Entity<CourseEntity>().HasMany(a => a.Sections).WithOne(b => b.Course);
            modelBuilder.Entity<CourseEntity>().Property(b => b.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<CourseEntity>().HasOne(b => b.Area).WithMany(a => a.Courses);

            modelBuilder.Entity<SectionEntity>().ToTable("Sections");
            modelBuilder.Entity<SectionEntity>().HasMany(a => a.Lessons).WithOne(b => b.Section);
            modelBuilder.Entity<SectionEntity>().HasMany(a => a.Practices).WithOne(b => b.Section);
            modelBuilder.Entity<SectionEntity>().Property(b => b.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<SectionEntity>().HasOne(b => b.Course).WithMany(a => a.Sections);

            modelBuilder.Entity<LessonEntity>().ToTable("Lessons");
            modelBuilder.Entity<LessonEntity>().Property(b => b.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<LessonEntity>().HasOne(b => b.Section).WithMany(a => a.Lessons);

            modelBuilder.Entity<PracticeEntity>().ToTable("Practices");
            modelBuilder.Entity<PracticeEntity>().Property(b => b.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<PracticeEntity>().HasOne(b => b.Section).WithMany(a => a.Practices);

        }

        public DbSet<AreaEntity> Areas { get; set; }
        public DbSet<CourseEntity> Courses { get; set; }
        public DbSet<SectionEntity> Sections{ get; set; }
        public DbSet<LessonEntity> Lessons { get; set; }
        public DbSet<PracticeEntity> Practices { get; set; }
    }

}
