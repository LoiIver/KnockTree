using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(KnockTree.Startup))]
namespace KnockTree
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
