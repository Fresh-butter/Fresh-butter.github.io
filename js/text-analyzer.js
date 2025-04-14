/**
 * Text Analyzer - Analyzes text input and provides statistical information
 * Calculates letters, words, spaces, newlines, and special symbols
 * Tokenizes text and counts pronouns, prepositions, and indefinite articles
 */

document.addEventListener('DOMContentLoaded', function() {
    // Wait for the text-analyzer section to be loaded
    const checkInterval = setInterval(() => {
        if (document.getElementById('text-input')) {
            clearInterval(checkInterval);
            initTextAnalyzer();
        }
    }, 100);
});

function initTextAnalyzer() {
    // Get DOM elements
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const analysisResults = document.getElementById('analysis-results');
    const basicStats = document.getElementById('basic-stats');
    const pronounsStats = document.getElementById('pronouns-stats');
    const prepositionsStats = document.getElementById('prepositions-stats');
    const articlesStats = document.getElementById('articles-stats');

    // Add event listeners
    analyzeBtn.addEventListener('click', analyzeText);
    clearBtn.addEventListener('click', clearText);

    // Define word lists
    const pronouns = [
        'i', 'me', 'my', 'mine', 'myself',
        'you', 'your', 'yours', 'yourself', 'yourselves',
        'he', 'him', 'his', 'himself',
        'she', 'her', 'hers', 'herself',
        'it', 'its', 'itself',
        'we', 'us', 'our', 'ours', 'ourselves',
        'they', 'them', 'their', 'theirs', 'themselves',
        'who', 'whom', 'whose', 'which', 'that',
        'what', 'whatever', 'whoever', 'whomever',
        'this', 'these', 'that', 'those'
    ];

    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
        'around', 'as', 'at', 'before', 'behind', 'below', 'beneath', 'beside',
        'between', 'beyond', 'by', 'concerning', 'considering', 'despite', 'down',
        'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near',
        'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding',
        'round', 'since', 'through', 'throughout', 'to', 'toward', 'towards', 'under',
        'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'
    ];

    const indefiniteArticles = ['a', 'an'];

    // Function to analyze text
    function analyzeText() {
        const text = textInput.value.trim();
        
        if (text.length === 0) {
            alert('Please enter some text to analyze.');
            return;
        }

        // Show results container
        analysisResults.style.display = 'flex';

        // Calculate basic statistics
        const basicStatistics = calculateBasicStats(text);
        displayBasicStats(basicStatistics);

        // Tokenize text
        const tokens = tokenizeText(text);

        // Analyze and display word categories
        displayCategoryStats(pronounsStats, countWordsByCategory(tokens, pronouns), 'Pronoun');
        displayCategoryStats(prepositionsStats, countWordsByCategory(tokens, prepositions), 'Preposition');
        displayCategoryStats(articlesStats, countWordsByCategory(tokens, indefiniteArticles), 'Article');
    }

    // Function to calculate basic statistics
    function calculateBasicStats(text) {
        return {
            letters: (text.match(/[a-zA-Z]/g) || []).length,
            words: text.split(/\s+/).filter(word => word.length > 0).length,
            spaces: (text.match(/\s/g) || []).length,
            newlines: (text.match(/\n/g) || []).length,
            specialSymbols: (text.match(/[^a-zA-Z0-9\s]/g) || []).length
        };
    }

    // Function to tokenize text
    function tokenizeText(text) {
        // Convert to lowercase and replace non-alphanumeric with spaces
        const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
        // Split by whitespace and filter out empty strings
        return cleanText.split(/\s+/).filter(token => token.length > 0);
    }

    // Function to count words by category
    function countWordsByCategory(tokens, categoryWords) {
        const counts = {};
        
        // Initialize counts for all category words
        categoryWords.forEach(word => {
            counts[word] = 0;
        });
        
        // Count occurrences
        tokens.forEach(token => {
            if (categoryWords.includes(token)) {
                counts[token]++;
            }
        });
        
        // Filter out words with zero count
        return Object.fromEntries(
            Object.entries(counts).filter(([_, count]) => count > 0)
        );
    }

    // Function to display basic statistics
    function displayBasicStats(stats) {
        basicStats.innerHTML = `
            <div class="stats-grid">
                <div class="stats-item">
                    <div class="stats-value">${stats.letters}</div>
                    <div class="stats-label">Letters</div>
                </div>
                <div class="stats-item">
                    <div class="stats-value">${stats.words}</div>
                    <div class="stats-label">Words</div>
                </div>
                <div class="stats-item">
                    <div class="stats-value">${stats.spaces}</div>
                    <div class="stats-label">Spaces</div>
                </div>
                <div class="stats-item">
                    <div class="stats-value">${stats.newlines}</div>
                    <div class="stats-label">Newlines</div>
                </div>
                <div class="stats-item">
                    <div class="stats-value">${stats.specialSymbols}</div>
                    <div class="stats-label">Special Symbols</div>
                </div>
            </div>
        `;
    }

    // Function to display category statistics
    function displayCategoryStats(container, counts, categoryName) {
        if (Object.keys(counts).length === 0) {
            container.innerHTML = `<p class="no-results">No ${categoryName.toLowerCase()}s found in the text.</p>`;
            return;
        }

        // Sort by count (descending)
        const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        
        let tableHTML = `
            <table class="stats-table">
                <tbody>
        `;
        
        sortedEntries.forEach(([word, count]) => {
            tableHTML += `
                <tr>
                    <td>${word}</td>
                    <td>${count}</td>
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        container.innerHTML = tableHTML;
    }


    // Function to clear text
    function clearText() {
        textInput.value = '';
        analysisResults.style.display = 'none';
    }
}
