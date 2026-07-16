import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// ========================================
// SUPABASE CONFIGURATION
// ========================================

const supabaseUrl = "https://eaqvhxfvozhzatrnbkvx.supabase.co";

const supabaseKey =
  "sb_publishable_u4ymkO5tFBauze0rVOkf-Q_kvbiIdwH";

const supabase = createClient(supabaseUrl, supabaseKey);

// ========================================
// HTML ELEMENTS
// ========================================

const countLabel = document.getElementById("countLabel");
const increaseBtn = document.getElementById("increaseBtn");

if (!countLabel) {
  console.error('Element with ID "countLabel" was not found.');
}

if (!increaseBtn) {
  console.error('Element with ID "increaseBtn" was not found.');
}

// ========================================
// LOAD CURRENT DOWNLOAD COUNT
// ========================================

async function loadCvDownloads() {
  if (!countLabel) {
    return;
  }

  try {
    const { data, error } = await supabase
      .from("portfolio_stats")
      .select("stat_value")
      .eq("stat_name", "cv_downloads")
      .single();

    if (error) {
      throw error;
    }

    countLabel.textContent = data?.stat_value ?? 0;
  } catch (error) {
    console.error("Error loading CV download count:", error);
    countLabel.textContent = "0";
  }
}

// ========================================
// INCREASE DOWNLOAD COUNT
// ========================================

async function increaseCvDownloads() {
  try {
    const { data, error } = await supabase.rpc(
      "increment_cv_downloads"
    );

    if (error) {
      throw error;
    }

    if (countLabel) {
      countLabel.textContent = data ?? 0;
    }
  } catch (error) {
    console.error("Error increasing CV download count:", error);
  }
}

// ========================================
// EVENT LISTENER
// ========================================

if (increaseBtn) {
  increaseBtn.addEventListener("click", () => {
    increaseCvDownloads();
  });
}

// ========================================
// INITIAL LOAD
// ========================================

loadCvDownloads();