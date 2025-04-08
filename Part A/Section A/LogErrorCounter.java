
/*
 *The following code receives a log file and splits the file into small blocks. The code processes each part separately and updates the frequency of each error code in a map data structure.
 *The code then uses a minimum heap to find the N most common error codes. The code then displays the N error codes in descending order.
 *Time complexity:
 *Reading the file and splitting it into blocks is done row by row -O(L), where L is the number of rows in the file.
 *Processing each block, traversing row by row - O(L).
 *Then traversing all M error types in the map and inserting them into the minimum stack of size N takes O(MlogN). Where *N represents the number of most common error codes.
 *Then sorting the stack for printing in descending order -O(NlogN)
 *Since the order of magnitude of M is equal to the order of magnitude of N, the order of magnitude of O(NlogN) is less *significant.
 *Therefore, in the average case, the runtime complexity is O(L+ MlogN).
 *
 *Space Complexity:
 *File Reading and Block Division: At any given time, a block of up to blockSize lines is stored — that is, O(B). The *blockSize is constant (10,000), so the space required to store one block is constant:O(B)=O(1) .
 *Error Type Map: The map stores all unique error types, M, so the space complexity is O(M).
 *Minimum Heap: The heap contains up to N items, so the space complexity is O(N).
 *List for Final Sorting and Display: A copy of the heap (up to N items) is created and sorted. The space complexity is :
 * O(N).
 *Since M is greater than or equal to N, the overall space complexity is O(M).
 */
import java.io.*;
import java.util.*;

public class LogErrorCounter {
    private int n;
    private String textFile;
    private Map<String, Integer> errorCodesMap;
    private final int blockSize = 10000;

    /* Constructor */
    public LogErrorCounter(int n, String textFile) {
        this.n = n;
        this.textFile = textFile;
        this.errorCodesMap = new HashMap<>();
        try {
            splittingBlocks();
            System.out.println(getNTopErrors());
        } catch (IOException e) {
            System.err.println("Failed to process the log file. Exiting.");
            return;
        }
    }/* End of constructor */

    /* Splitting file into small blocks */
    private void splittingBlocks() throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(textFile))) {
            int lineCounter = 0;
            List<String> block = new ArrayList<>();
            String line = reader.readLine();
            while (line != null) {
                block.add(line);
                lineCounter++;
                if (lineCounter == blockSize) {
                    blockProcessing(block);
                    block.clear();
                    lineCounter = 0;
                }
                line = reader.readLine();
            }
            if (!block.isEmpty()) {
                blockProcessing(block);
            }
        } catch (IOException e) {
            throw new IOException("Error reading file");
        }
    }

    /* Process each block */
    private void blockProcessing(List<String> block) {
        for (String line : block) {
            /* * Getting the error type from the current line. */
            String errorType = line.split("Error:")[1].trim().replaceAll("\"$", "");
            errorCodesMap.put(errorType, errorCodesMap.getOrDefault(errorType, 0) + 1);
        }
    }

    /* Get Top N Errors */
    private String getNTopErrors() {
        PriorityQueue<Map.Entry<String, Integer>> minHeap = new PriorityQueue<>(
                Comparator.comparingInt(Map.Entry::getValue));
        for (Map.Entry<String, Integer> entry : errorCodesMap.entrySet()) {
            minHeap.offer(entry);
            if (minHeap.size() > n) {
                minHeap.poll(); /* If heap exceeds N than remove smallest element. */
            }
        }
        List<Map.Entry<String, Integer>> topErrors = new ArrayList<>(minHeap);
        topErrors.sort((e1, e2) -> Integer.compare(e2.getValue(), e1.getValue()));

        String str = "The most common error codes are:\n";
        for (Map.Entry<String, Integer> entry : topErrors) {
            str += entry.getKey() + ": " + entry.getValue() + "\n";
        }

        return str;
    }

    public static void main(String[] args) {
        new LogErrorCounter(5, "logs.txt");
    }

}
