using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PequeInnovaAPI.Data;
using PequeInnovaAPI.Data.Repository;
using PequeInnovaAPI.Services;

namespace PequeInnovaAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddTransient<IAreaService, AreaService>();
            services.AddTransient<ICourseService, CourseService>();
            services.AddTransient<ISectionService, SectionService>();
            services.AddTransient<IPracticeService, PracticeService>();
            services.AddTransient<ILessonService, LessonService>();
            services.AddTransient<IPequeInnovaRepository, PequeInnovaRepository>();

            services.AddEntityFrameworkSqlServer();
            services.AddDbContext<ApiDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("PequeInnovaApiDatabase")
                    )
            );

            services.AddAutoMapper(typeof(Startup));
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
