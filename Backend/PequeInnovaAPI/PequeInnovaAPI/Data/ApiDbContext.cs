using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PequeInnovaAPI.Data.Entities;
using PequeInnovaAPI.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data
{
    public class ApiDbContext:IdentityDbContext<ApplicationUser>
    {
        public DbSet<CommentEntity> Comments { get; set; }
        public DbSet<InscriptionEntity> Inscriptions { get; set; }
        public DbSet<TeachingEntity> Teachings { get; set; }
        public DbSet<AssignmentEntity> Assignments { get; set; }
        public ApiDbContext(DbContextOptions<ApiDbContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
            modelBuilder.Entity<InscriptionEntity>().Property(i => i.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<TeachingEntity>().ToTable("Teachings");
            modelBuilder.Entity<TeachingEntity>().Property(t => t.Id).ValueGeneratedOnAdd();
            
            modelBuilder.Entity<AssignmentEntity>().ToTable("Assingnments");
            modelBuilder.Entity<AssignmentEntity>().Property(a => a.Id).ValueGeneratedOnAdd();

           
        }
    }
}
