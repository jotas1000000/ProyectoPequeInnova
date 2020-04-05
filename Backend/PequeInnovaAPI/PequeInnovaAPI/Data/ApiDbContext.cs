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
            modelBuilder.Entity<CourseEntity>().Property(b => b.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<CourseEntity>().HasOne(b => b.Area).WithMany(a => a.Courses);
        }

        public DbSet<AreaEntity> Areas { get; set; }
        public DbSet<CourseEntity> Courses { get; set; }
    }

}
