namespace Bookkeeper
{
    public class PlayerInventory
    {
        private static PlayerInventory? instance;

        public static PlayerInventory GetInventory()
        {
            if (instance == null)
            {
                instance = new PlayerInventory();
            }

            return instance;
        }

        // Public methods

        // TODO figure out actual return value
        public string? BestElementForAspect(string aspect)
        {
            // TODO
            return "Chor";
        }

        // TODO figure out actual return value
        public string? BestSkillForAspect(string aspect)
        {
            // TODO
            return "Anbary & Lapidary";
        }

        // TODO figure out actual return value
        public string? BestToolForAspect(string aspect)
        {
            // TODO
            return "Scales";
        }

        // TODO figure out actual return value
        public string? BestMemoryForAspect(string aspect)
        {
            // TODO
            return "Memory: Storm";
        }

        // TODO figure out return value
        public object BestReadingRecipes()
        {
            // TODO
            return null;
        }
    }
}