[assembly: WebActivator.PreApplicationStartMethod(typeof(niccom.net.App_Start.SquishItLess), "Start")]

namespace niccom.net.App_Start
{
    using SquishIt.Framework;
    using SquishIt.Less;

    public class SquishItLess
    {
        public static void Start()
        {
            Bundle.RegisterStylePreprocessor(new LessPreprocessor());
        }
    }
}